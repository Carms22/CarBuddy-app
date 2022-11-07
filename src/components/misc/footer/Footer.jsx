import '../../../styles/partials/components/Footer.scss'
import 'fa-icons';


function Footer() {
  return ( 
    
		<footer className="footer-distributed">

			<div className="footer-right">
				<a href="https://www.linkedin.com/in/garciaguzman/"><i className="fab fa-linkedin"></i></a>
				<a href="https://github.com/Carms22"><i className="fab fa-github"></i></a>
			</div>

			<div className="footer-left">
				<p className="footer-links">
					<a href="/about">About</a>
					<a href="/fac">Faq</a>
					<a href="/contact">Contact</a>
				</p>
        <p className="footer-links">
				  <a href="/">CarBuddy &copy; 2022</a>
        </p>
			</div>

		</footer>
    
   );
}

export default Footer;