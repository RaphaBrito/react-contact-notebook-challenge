import './Loading.css'; // Import your CSS file

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <h1>Carregando...</h1>
    </div>
  );
}
