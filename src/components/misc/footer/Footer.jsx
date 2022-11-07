import '../../../styles/partials/components/Footer.scss'
import 'fa-icons';


function Footer() {
  return ( 
    
		<footer className="footer-distributed">

			<div className="footer-right">
				<a href="https://www.linkedin.com/in/garciaguzman/"><i className="fa fa-linkedin"></i></a>
				<a href="https://github.com/Carms22"><i className="fa fa-github"></i></a>
        <i className="fas fa-address-card" color="#2980B9" size="2em"></i>
        <i class="fa fa-camera-retro fa-lg"></i>
			</div>

			<div className="footer-left">

				<p className="footer-links">
					<a className="link-1" href="/">Home</a>
					<a href="/about">About</a>
					<a href="/fac">Faq</a>
					<a href="/contact">Contact</a>
				</p>

				<p>CarBuddy &copy; 2022</p>
			</div>

		</footer>
    // <footer className="site-footer">
    //   <div className="container">
    //     <div className="row">
    //       <div className="col-sm-12 col-md-4">
    //         <h6>CarBuddy</h6>
    //         <p className="text-justify"><i>CarBuddy</i><small> An application for ... </small></p>
    //         <div className="col-md-8 col-sm-6 col-xs-12">
    //           <p className="copyright-text"><small>Copyright 2022</small></p>
    //         </div>
    //       </div>

    //       <div className=" row col-md-6">
    //         <h6 className="text-center">Contact information:</h6>
    //         <div className="col-xs-6 col-md-6">
    //           <ul className="footer-links">
    //             <li>Carmen García Guzmán</li>
    //             <li><small>c.garcia.guzman2@gmail.com</small></li>
    //           </ul>
    //           <div className=" row col-xs-6 col-md-6">
    //             <ul className="social-icons">
    //               <li><a className="github" href="https://github.com/Carms22"><i className="fa fa-github"></i></a></li>
    //               <li><a className="linkedin" href="https://www.linkedin.com/in/garciaguzman/"><i
    //                     className="fa fa-linkedin"></i></a></li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="col-xs-6 col-md-2">
    //         <h6>Go to:</h6>
    //         <ul className="footer-links">
    //           <li><small><i><a href="/about" className="nav-link text-white">About Us</a></i></small></li>
    //           <li><small><i><a href="/contactUs" className="nav-link text-white">Contact Us</a></i></small></li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </footer>
   );
}

export default Footer;