import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react'

const DEFAULT_DURATION = 5000
// Sits just below the 64px admin nav so it never covers the signed-in username.
const TOAST_TOP = 76

const ToastContext = createContext({ showToast: () => {} })

const TONES = {
  success: {
    box: 'bg-green-50 border-green-600 text-green-900',
    icon: 'text-green-600',
    path: 'M5 13l4 4L19 7',
  },
  error: {
    box: 'bg-red-50 border-red-600 text-red-900',
    icon: 'text-red-600',
    path: 'M6 18L18 6M6 6l12 12',
  },
}

// Mounted once at the app root so a toast survives route changes,
// e.g. the redirect from /login to /admin.
export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)
  const timer = useRef(null)

  const dismiss = useCallback(() => {
    clearTimeout(timer.current)
    setToast(null)
  }, [])

  const showToast = useCallback(({ message, type = 'success', duration = DEFAULT_DURATION }) => {
    clearTimeout(timer.current)
    setToast({ message, type, id: Date.now() })
    timer.current = setTimeout(() => setToast(null), duration)
  }, [])

  useEffect(() => () => clearTimeout(timer.current), [])

  const value = useMemo(() => ({ showToast, dismiss }), [showToast, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed right-4 left-4 z-50 flex justify-end pointer-events-none noprint"
        style={{ top: TOAST_TOP }}
        role="status"
        aria-live="polite"
      >
        {toast && <ToastMessage key={toast.id} {...toast} onDismiss={dismiss} />}
      </div>
    </ToastContext.Provider>
  )
}

function ToastMessage({ message, type, onDismiss }) {
  const tone = TONES[type] || TONES.success

  return (
    <div
      className={`flex items-start max-w-sm px-4 py-3 border-l-4 rounded-md shadow-lg pointer-events-auto ${tone.box}`}
    >
      <svg
        className={`flex-shrink-0 w-6 h-6 mr-3 ${tone.icon}`}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tone.path} />
      </svg>
      <p className="flex-1 text-base font-semibold leading-snug">{message}</p>
      <button
        type="button"
        className="ml-4 text-xl leading-none opacity-60 hover:opacity-100"
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        &times;
      </button>
    </div>
  )
}

export const useToast = () => useContext(ToastContext)
