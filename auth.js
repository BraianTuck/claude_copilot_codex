// Supabase config
const SUPABASE_URL = 'https://wdrgixdhusbtukeophms.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkcmdpeGRodXNidHVrZW9waG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NzQ0MDIsImV4cCI6MjA4OTM1MDQwMn0.s5raf1BCR81WiqKHQW3kIsuNH0OE8fV4o-eVMZKQDLU';

let supabaseClient;
let isLoginMode = true;
let currentUser = null;

// DOM elements (initialized after DOMContentLoaded)
let authBtn, authModal, modalClose, modalBackdrop, authView, subscribeView;
let authForm, authEmail, authPassword, authSubmit, authToggle, authError;
let subscribeForm, telegramChatId, notifyYoutube, notifyLinkedin;
let subscribeError, subscribeSuccess, authLogout;

document.addEventListener('DOMContentLoaded', () => {
  console.log('Auth.js loaded');
  
  // Initialize Supabase
  if (!window.supabase) {
    console.error('Supabase not loaded!');
    return;
  }
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('Supabase initialized');

  // Get DOM elements
  authBtn = document.getElementById('auth-btn');
  authModal = document.getElementById('auth-modal');
  
  if (!authBtn) {
    console.error('auth-btn not found!');
    return;
  }
  if (!authModal) {
    console.error('auth-modal not found!');
    return;
  }
  
  console.log('Elements found, setting up...');
  
  modalClose = document.getElementById('modal-close');
  modalBackdrop = authModal.querySelector('.modal-backdrop');
  authView = document.getElementById('auth-view');
  subscribeView = document.getElementById('subscribe-view');
  authForm = document.getElementById('auth-form');
  authEmail = document.getElementById('auth-email');
  authPassword = document.getElementById('auth-password');
  authSubmit = document.getElementById('auth-submit');
  authToggle = document.getElementById('auth-toggle');
  authError = document.getElementById('auth-error');
  subscribeForm = document.getElementById('subscribe-form');
  telegramChatId = document.getElementById('telegram-chat-id');
  notifyYoutube = document.getElementById('notify-youtube');
  notifyLinkedin = document.getElementById('notify-linkedin');
  subscribeError = document.getElementById('subscribe-error');
  subscribeSuccess = document.getElementById('subscribe-success');
  authLogout = document.getElementById('auth-logout');

  // Event listeners
  authBtn.addEventListener('click', () => {
    console.log('Button clicked!');
    openModal();
  });
  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  authForm.addEventListener('submit', handleAuth);
  authToggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggleAuthMode();
  });
  authLogout.addEventListener('click', handleLogout);
  subscribeForm.addEventListener('submit', handleSubscribe);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !authModal.hidden) {
      closeModal();
    }
  });

  // Init auth state
  init();
});

// Initialize
async function init() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session) {
    currentUser = session.user;
    updateAuthButton();
    await loadSubscription();
  }

  // Listen for auth changes
  supabaseClient.auth.onAuthStateChange(async (event, session) => {
    currentUser = session?.user || null;
    updateAuthButton();
    if (currentUser) {
      await loadSubscription();
    }
  });
}

function updateAuthButton() {
  if (currentUser) {
    authBtn.textContent = '⚙️ Mi suscripción';
  } else {
    authBtn.textContent = '🔔 Suscribirse';
  }
}

// Modal controls
function openModal() {
  authModal.hidden = false;
  document.body.style.overflow = 'hidden';
  if (currentUser) {
    showSubscribeView();
  } else {
    showAuthView();
  }
}

function closeModal() {
  authModal.hidden = true;
  document.body.style.overflow = '';
  authError.hidden = true;
  subscribeError.hidden = true;
  subscribeSuccess.hidden = true;
}

function showAuthView() {
  authView.hidden = false;
  subscribeView.hidden = true;
}

function showSubscribeView() {
  authView.hidden = true;
  subscribeView.hidden = false;
}

// Auth functions
async function handleAuth(e) {
  e.preventDefault();
  authError.hidden = true;
  authSubmit.disabled = true;
  authSubmit.textContent = 'Cargando...';

  const email = authEmail.value.trim();
  const password = authPassword.value;

  try {
    let result;
    if (isLoginMode) {
      result = await supabaseClient.auth.signInWithPassword({ email, password });
    } else {
      result = await supabaseClient.auth.signUp({ email, password });
    }

    if (result.error) {
      throw result.error;
    }

    if (!isLoginMode && result.data.user && !result.data.session) {
      authError.textContent = '📧 Revisá tu email para confirmar la cuenta';
      authError.hidden = false;
      authError.classList.add('form-info');
    } else {
      currentUser = result.data.user;
      showSubscribeView();
    }
  } catch (err) {
    authError.textContent = translateError(err.message);
    authError.hidden = false;
    authError.classList.remove('form-info');
  } finally {
    authSubmit.disabled = false;
    authSubmit.textContent = isLoginMode ? 'Iniciar sesión' : 'Crear cuenta';
  }
}

function translateError(msg) {
  const translations = {
    'Invalid login credentials': 'Email o contraseña incorrectos',
    'User already registered': 'Este email ya está registrado',
    'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres',
    'Unable to validate email address: invalid format': 'El formato del email no es válido',
  };
  return translations[msg] || msg;
}

function toggleAuthMode() {
  isLoginMode = !isLoginMode;
  authSubmit.textContent = isLoginMode ? 'Iniciar sesión' : 'Crear cuenta';
  authToggle.textContent = isLoginMode ? '¿No tenés cuenta? Registrate' : '¿Ya tenés cuenta? Iniciá sesión';
  authError.hidden = true;
}

async function handleLogout() {
  await supabaseClient.auth.signOut();
  currentUser = null;
  updateAuthButton();
  closeModal();
}

// Subscription functions
async function loadSubscription() {
  if (!currentUser) return;

  const { data, error } = await supabaseClient
    .from('subscriptions')
    .select('*')
    .eq('user_id', currentUser.id)
    .single();

  if (data) {
    telegramChatId.value = data.telegram_chat_id || '';
    notifyYoutube.checked = data.notify_youtube !== false;
    notifyLinkedin.checked = data.notify_linkedin !== false;
  }
}

async function handleSubscribe(e) {
  e.preventDefault();
  subscribeError.hidden = true;
  subscribeSuccess.hidden = true;

  const chatId = telegramChatId.value.trim();
  if (!chatId || !/^\d+$/.test(chatId)) {
    subscribeError.textContent = 'Ingresá un Chat ID válido (solo números)';
    subscribeError.hidden = false;
    return;
  }

  try {
    const { error } = await supabaseClient
      .from('subscriptions')
      .upsert({
        user_id: currentUser.id,
        email: currentUser.email,
        telegram_chat_id: chatId,
        notify_youtube: notifyYoutube.checked,
        notify_linkedin: notifyLinkedin.checked,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id'
      });

    if (error) throw error;

    subscribeSuccess.hidden = false;
    setTimeout(() => {
      subscribeSuccess.hidden = true;
    }, 3000);
  } catch (err) {
    subscribeError.textContent = 'Error al guardar: ' + err.message;
    subscribeError.hidden = false;
  }
}
