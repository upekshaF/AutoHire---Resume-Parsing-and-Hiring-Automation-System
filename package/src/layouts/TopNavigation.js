// TopNavigation.js
import React from 'react';
import '../layouts/layout.css'
const TopNavigation = () => {
  return (

    <nav class="navbar navbar-expand-lg navbar-light ">
  <div class="container-fluid">
    {/* <!-- Insert site name "Resume Parser" to the left corner --> */}
    <h3 class="navbar-brand" href="#">Resume Parser</h3>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active " aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/">Contact Us</a>
        </li>
      </ul>
    </div>
  </div>
</nav>




  )


  
};




export default TopNavigation;
