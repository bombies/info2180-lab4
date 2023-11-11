// (() => {
//     const searchBtn = document.getElementById("search")
//     if (!searchBtn)
//         return;

//     searchBtn.addEventListener('click', async () => {
//         const res = await fetch("superheroes.php", {
//             method: "GET"
//         })

//         if (!res.ok)
//             return console.error(res)

//         const data = await res.text()
//         alert(data)
//     })
// })()

// Handle form submit
(() => {
    const form = document.getElementById("superhero_form")
    if (!form)
        return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const data = new FormData(form)
        const DATA_REGEX = /[a-zA-Z\s]+/g

        // Filter unwanted characters
        const name = data.get("name") ? data.get("name").match(DATA_REGEX).join('') : ""
        const res = await fetch(`superheroes.php?query=${name}`)

        const resultDiv = document.getElementById("result")
        if (!resultDiv)
            return;

        if (!res.ok) {
            resultDiv.innerHTML = "<p class=\"error-msg\">Superhero not found</p>"
            return;
        }

        const fetchedData = await res.json()
        if (!fetchedData.length) {
            resultDiv.innerHTML = "<p class=\"error-msg\">Superhero not found</p>"
            return;
        }

        resultDiv.innerHTML = name !== "" ? fetchedData.map(entry => `
        <h2>${entry.name}</h2>
        <h3>A.K.A ${entry.alias}</h3>
        <article><p>${entry.biography}</p></article>
        `).join("") : (`
        <ul>
        ${fetchedData.map(entry => `<li>${entry.alias}</li>`).join("")}
        </ul>
        `)
    })
})()