import './Error.css';
import errorImage from '../../assets/images/error-image.png';

export default function AppError() {
  return (
    <div className="error-container">
      <img src={errorImage} alt="Error" className="error-image" />
      <h1>Que pena, algo de errado aconteceu...</h1>
    </div>
  );
}
