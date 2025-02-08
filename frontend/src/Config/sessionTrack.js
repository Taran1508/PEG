import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const IDLE_TIMEOUT = 5 * 60 * 1000;
const MAX_SESSION_TIME = 30 * 60 * 1000;

function SessionTrack({ page }) {
  const navigate = useNavigate();

  const logoutUser = useCallback(() => {
    localStorage.removeItem('token');
    navigate(`/login/${page}`);
  }, [navigate, page]);

  const lastActivity = useRef(Date.now());
  const sessionStart = useRef(Date.now());
  const timerRef = useRef(null);

  const resetTimer = () => {
    lastActivity.current = Date.now();
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click'];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    timerRef.current = setInterval(() => {
      const now = Date.now();
      const inactiveTime = now - lastActivity.current;
      const sessionTime = now - sessionStart.current;

      if (inactiveTime > IDLE_TIMEOUT || sessionTime > MAX_SESSION_TIME) {
        logoutUser();
      }
    }, 1000);

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearInterval(timerRef.current);
    };
  }, [logoutUser]);

  return null;
}

export default SessionTrack;
