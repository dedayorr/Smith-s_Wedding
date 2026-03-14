import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
      if (ringRef.current)   ringRef.current.style.transform   = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
    };
    document.addEventListener('mousemove', move);
    return () => document.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} id="cursor"></div>
      <div className="cursor-ring" ref={ringRef} id="cursorRing"></div>
    </>
  );
}
