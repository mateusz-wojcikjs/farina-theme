// document.addEventListener("loadeddata", () => {
    const yearElement = document.getElementById("year");
    const currentDate = new Date();
       const currentYear = currentDate.getFullYear();
    yearElement.innerText = currentYear;
// })