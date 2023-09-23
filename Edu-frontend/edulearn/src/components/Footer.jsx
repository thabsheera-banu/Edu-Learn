// import React from 'react'

// function Footer() {
//   return (
//     <footer className="text-muted py-5 border-top mt-5">
//   <div className="container">
//     <p className="float-end mb-1">
//       <a href="#">Back to top</a>
//     </p>
//     <p className="mb-1">Album example is © Bootstrap, but please download and customize it for yourself!</p>
//     <p className="mb-0">New to Bootstrap? <a href="/">Visit the homepage</a> or read our <a href="/docs/5.0/getting-started/introduction/">getting started guide</a>.</p>
//   </div>
// </footer>
//   )
// }

// export default Footer

import React from 'react'

function Footer() {
  return (
    <div>
      <footer class="footer-07">
			<div class="container">
				<div class="row justify-content-center">
					<div class="col-md-12 text-center">
						<h2 class="footer-heading"><a href="#" class="logo">Colorlib.com</a></h2>
						<p class="menu">
							<a href="#">Home</a>
							<a href="#">Agent</a>
							<a href="#">About</a>
							<a href="#">Listing</a>
							<a href="#">Blog</a>
							<a href="#">Contact</a>
						</p>
						<ul class="ftco-footer-social p-0">
              <li class="ftco-animate"><a href="#" data-toggle="tooltip" data-placement="top" title="Twitter"><span class="ion-logo-twitter"></span></a></li>
              <li class="ftco-animate"><a href="#" data-toggle="tooltip" data-placement="top" title="Facebook"><span class="ion-logo-facebook"></span></a></li>
              <li class="ftco-animate"><a href="#" data-toggle="tooltip" data-placement="top" title="Instagram"><span class="ion-logo-instagram"></span></a></li>
            </ul>
					</div>
				</div>
				<div class="row mt-5">
					<div class="col-md-12 text-center">
						<p class="copyright">
					  Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="ion-ios-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib.com</a>
					  </p>
					</div>
				</div>
			</div>
		</footer>
      
    </div>
  )
}

export default Footer

