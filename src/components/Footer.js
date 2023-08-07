import { FaGithub, FaHouzz} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-light py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="text-center text-lg-start mb-0">
              &copy; {new Date().getFullYear()} Abdulamitov Muralim
            </p>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-end ">
              <a href="https://github.com/ErenYeager04/e-shop-frontend">
                <FaGithub size={30} />
                <span className="pl-2 mx-2">Frontend</span>
              </a>
              <a href="https://github.com/ErenYeager04/e-shop-backend" className="ml-4">
                <FaGithub size={30} />
                <span className="pl-2 mx-2">Backend</span>
              </a>
              <a href={`${process.env.REACT_APP_BACKEND}/swagger/index.html`} className="ml-4">
                <FaHouzz size={30} />
                <span className="pl-2 mx-2">Endpoints</span>
              </a>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

