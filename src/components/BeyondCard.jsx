function BeyondCard({ children, className = '' }) {
  return (
    <article className={`beyond-card ${className}`}>
      {children}
    </article>
  );
}

export default BeyondCard;