const nav = document.querySelector("nav");
const navItemsUl = document.querySelector(".nav-items");
const navFlyIn = document.querySelector("#nav-fly-in");
const SCREEN_WIDTH_LARGE = 992;
let currScreenWidth = window.innerWidth;

const toggleBtn = document.querySelector("#menu-toggle");

toggleBtn.addEventListener("click", () =>
{
    navFlyIn.classList.toggle("show")
})

window.addEventListener("resize", () =>
{
    let newScreenWidth = window.innerWidth;
    //Change to desktop from mobile
    if (currScreenWidth < SCREEN_WIDTH_LARGE && newScreenWidth >= SCREEN_WIDTH_LARGE)
    {
        changeNavDesktop();
    }
    //Change to mobile from desktop
    if (currScreenWidth >= SCREEN_WIDTH_LARGE && newScreenWidth < SCREEN_WIDTH_LARGE)
    {
        changeNavMobile();
    }
    //Update screen width
    currScreenWidth = newScreenWidth;
});

window.addEventListener("load", () =>
{
    //Change default nav config to desktop
    if (window.innerWidth >= SCREEN_WIDTH_LARGE)
    {
        changeNavDesktop();
    }
});

function changeNavDesktop()
{
    //Convert elements to array
    let listItems = [...navFlyIn.children];
    //Remove item from fly in and add to 
    listItems.forEach((item) =>
    {
        navFlyIn.removeChild(item);
        navItemsUl.appendChild(item);
    });
    

    //Remove menu toggle button
    navItemsUl.removeChild(toggleBtn)

    //If flyIn is open, remove "show" class
    navFlyIn.classList.remove("show")
}

function changeNavMobile()
{
    let listItems = [...navItemsUl.children];
    let newListItems = listItems.filter((item) => {return (item.classList.contains("nav-link") || item.id === 'search')});
    newListItems.forEach((item) =>
    {
        navItemsUl.removeChild(item);
        navFlyIn.appendChild(item);
    })

    //Add menu toggle button
    navItemsUl.appendChild(toggleBtn)

}

//Set the current year in copyright
document.querySelector("#year").innerHTML = (new Date()).getFullYear();