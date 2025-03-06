export const retrieveCounties = async () => {
    return await fetch("https://roloca.coldfuse.io/judete")
    .then(res => res.json())
    .then(data => data)
}

export const retrieveCities = async (code) => {
    return await fetch(`https://roloca.coldfuse.io/orase/${code}`)
    .then(res => res.json())
    .then(data => data)
} 