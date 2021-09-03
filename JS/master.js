// Start Checking ===========================================================================================
// Check If There Is Local Storage Color Option 
let mainColors = localStorage.getItem("color_option");

if(mainColors !== null) {

    document.documentElement.style.setProperty('--main-color' , mainColors);

    // Remove Active Class From All Color List Item
    document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove("active");

        // Add Active Class On Element With Data-Color === Local Storage Item
        if(element.dataset.color === mainColors) {

            // Add Active Class
            element.classList.add("active");    
        }
    
    }); 

}
// End =============================================================================================================



// Random Background Option 
let backgroundOption = true;

// variable To Control The Background Interval
let backgroundInterval;

// Check If There Is Local Storage Random Backgroun Item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check If Random Background Local Storage Is Not Empty
if(backgroundLocalItem !== null) {

    if(backgroundLocalItem === 'true')
    {

        backgroundOption = true;

    } 
    else 
    {
        backgroundOption = false;
    }
    // Remove Active Class From All Spans
    document.querySelectorAll(".random-backgrounds span").forEach(element => {

        element.classList.remove("active");

    });

    if (backgroundLocalItem === 'true')
    {

        document.querySelector(".random-backgrounds .yes").classList.add("active");
    }
    else 
    {
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}




// Start Settings Box ==============================================================================================
// Click On Toggel Settings Gear 
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    
    // toggle Class fa-spin for Rotation on self
    this.classList.toggle("fa-spin");

    // toggle Class Open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");

};
// End   Settings Box ================================================================================================




// Start Switch Color ================================================================================================
const colorLi = document.querySelectorAll(".colors-list li");
// Loop On List Items
colorLi.forEach(li => {
    
    // Click On Every List Items
    li.addEventListener("click", (e) => {

        // Set Color On Root
        document.documentElement.style.setProperty('--main-color' , e.target.dataset.color);

        // Set Color On Local Storage 
        localStorage.setItem("color_option", e.target.dataset.color);

        handleActive(e);
    });
});
// End   Switch Color ================================================================================================


// Start Switch Random Background Option  ============================================================================
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// Loop On All Spans
randomBackEl.forEach(span => {
    
    // Click On Every Span
    span.addEventListener("click", (e) => {

        handleActive(e);

        if (e.target.dataset.background === 'yes') {

            backgroundOption = true;

            randomizeImgs();

            localStorage.setItem("background_option", true);

        } 
        else {
        
            backgroundOption = false;
            
            clearInterval(backgroundInterval);

            localStorage.setItem("background_option", false);
        }

    });
});
// End  Switch Random Background Option  ===========================================================================



// Start Landing Page  ================================================================================================

// Select Landing Page Element 
let landingPage = document.querySelector(".landing-page");

// Get Array Of Imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function To Randomize Imgs
function randomizeImgs() {

    if(backgroundOption === true) {

        backgroundInterval = setInterval( () => {

            // Get Random Number 
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            // Change Background Image url 
            landingPage.style.backgroundImage = 'url("images/' + imgsArray[randomNumber] + ' ")';
        
        }, 1000 * 4);

    }
}
randomizeImgs(); 
// End  Landing Page  ================================================================================================

//----------------------------------------------------------------------------------------------------------------
// Select Skills Selector
// let ourSkills = document.querySelector(".skills");

// window.onscroll = function () {

// // Skills Offset Top
// let skillsOffsetTop = ourSkills.offsetTop;

// // Skills Outer Height
// let skillsOuterHeight = ourSkills.offsetHeight;

// // Window Height
// let windowHeight = this.innerHeight;

// // Window ScrollTop
// let windowScrollTop = this.pageYOffset;

// if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

//     let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

//     allSkills.forEach(skill => {

//         skill.style.width = skill.dataset.progress;

//     });

// }

// };
//----------------------------------------------------------------------------------------------------------------

// Start Gallery ==================================================================================================


// Creat popup With The Image 
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    
    img.addEventListener('click', (e) => {
        
        // Create Overlay Element 
        let Overlay = document.createElement("div");

        // Add Class To Overlay
        Overlay.className = 'popup-overlay';

        // Append Overlay To The Body
        document.body.appendChild(Overlay);

        // Creat Popup Box
        let popupBox = document.createElement("div");

        // Add The Class To The Popup Box
        popupBox.className = 'popup-box';


        if(img.alt !== null)
        {
            // Create Heading
            let imageHeading = document.createElement("h3");

            // Create Text For Heading 
            let imgText = document.createTextNode(img.alt);

            // Append The Text To The Heading
            imageHeading.appendChild(imgText);

            // Append The Heading To The Popup Box
            popupBox.appendChild(imageHeading);
        }


        // Create The Image
        let popupImage = document.createElement("img");

        // Set Image Source
        popupImage.src = img.src;

        // Add Image To Popup Box
        popupBox.appendChild(popupImage);

        //Append The Popup Box To Body
        document.body.appendChild(popupBox);

        // Create The Colse Span 
        let closeButton = document.createElement("span");

        // Create The Close Box Button text 
        let closeButtontext = document.createTextNode("X");

        //Append Text To Close Button
        closeButton.appendChild(closeButtontext);

        // Add Class To Close Button
        closeButton.className = 'close-button';

        // Add Close Button To The Popup Box
        popupBox.appendChild(closeButton);

    });
});

// Colse Popu
document.addEventListener("click", function(e) {

    if(e.target.className == 'close-button') 
    {
        // Remove The Current Popup
        e.target.parentNode.remove();

        // Remove Overlay
        document.querySelector(".popup-overlay").remove();
    }

});
//----------------
// End Gallery ==================================================================================================



// Start  Links And Nav ===============================================================================================


// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links 
const allLinks = document.querySelectorAll(".links a");


function scrollToSomewhere(elements) {

    elements.forEach(ele => {

        ele.addEventListener("click", (e) => {
    
            e.preventDefault();
        
            document.querySelector(e.target.dataset.section).scrollIntoView({
    
                behavior: 'smooth'
            });
    
        });
    });
    
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// End Links And Nav ==================================================================================================



// Start Handle Active State  =============================================================================

function handleActive(ev) {

    // Remove Active Class From All Childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");
    
    }); 

    // Add Active Class On Self
    ev.target.classList.add("active");

}
// End  Start Handle Active State  ==============================================================================

let bulletSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if(bulletLocalItem !== null)
{
    bulletSpan.forEach(span => {

        span.classList.remove("active");
    });

    if(bulletLocalItem === 'block')
    {
        bulletsContainer.style.display = 'block';

        document.querySelector(".bullets-option .yes").classList.add("active");
    
    }
    else
    {
        bulletsContainer.style.display = 'none';

        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletSpan.forEach(span => {

    span.addEventListener("click", (e) => {

        if(span.dataset.display === 'show') 
        {
            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullets_option", 'block');
        }
        else
        {
            bulletsContainer.style.display = 'none';

            localStorage.setItem("bullets_option", 'none');
        }

        handleActive(e);
    });
});
// ===================================================================================================


// Start Reset Button ================================================================================
document.querySelector(".reset-options").onclick = function() {

    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");
    
    // Reaload Window
    window.location.reload();
};
// End Reset Button ==================================================================================


// Toggle Menu 
let toggleBut = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBut.onclick = function (e) {


    // Stop Propagation
    e.stopPropagation();

    //Toggle Class "menu-active" On Button 
    this.classList.toggle("menu-active");

    // Toggle Class "open" On Links
    tLinks.classList.toggle("open");
};

// Click Anywhere Outside Menu And Toggle Button 
document.addEventListener("click", (e) => {

    if(e.target !== toggleBut && e.target !== tLinks) 
    {
        // Check If Menu Is Open 
        if(tLinks.classList.contains("open")) 
        {
            //Toggle Class "menu-active" On Button 
            toggleBut.classList.toggle("menu-active");

            // Toggle Class "open" On Links
            tLinks.classList.toggle("open");
        }
    }
});

// Stop Propagation On Menu
tLinks.onclick = function(e) {

    e.stopPropagation();

}








// This script requires jQuery and jquery-form plugin
// You can use these ones from Cloudflare CDN:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.2.2/jquery.form.min.js" integrity="sha256-2Pjr1OlpZMY6qesJM68t2v39t+lMLvxwpa8QlRjJroA=" crossorigin="anonymous"></script>
//
$('#bootstrapForm').submit(function (event) {
    event.preventDefault()
    var extraData = {}
    $('#bootstrapForm').ajaxSubmit({
        data: extraData,
        dataType: 'jsonp',  // This won't really work. It's just to use a GET instead of a POST to allow cookies from different domain.
        error: function () {
            // Submit of form should be successful but JSONP callback will fail because Google Forms
            // does not support it, so this is handled as a failure.
            alert('Form Submitted. Thanks.')
            // You can also redirect the user to a custom thank-you page:
            // window.location = 'http://www.mydomain.com/thankyoupage.html'
        }
    })
})










