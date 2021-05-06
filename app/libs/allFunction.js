function tglCantik(fulltgl) {
    const tgl = String(fulltgl.getDate()).padStart(2, 0)
    const bln = String(fulltgl.getMonth() + 1).padStart(2, 0)
    const thn = String(fulltgl.getFullYear()).padStart(2, 0)
    return `${thn}-${bln}-${tgl}`

}
function convertTZ(date = new Date(), tzHour = 7) {
    return new Date(date.setHours(date.getHours() + tzHour));
}


module.exports = { tglCantik, convertTZ }