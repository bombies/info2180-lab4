(() => {
    const searchBtn = document.getElementById("search")
    if (!searchBtn)
        return;

    searchBtn.addEventListener('click', async () => {
        const res = await fetch("superheroes.php", {
            method: "GET"
        })

        if (!res.ok)
            return console.error(res)

        const data = await res.text()
        alert(data)
    })
})()