export function timeToStr(time) {
    return time.replace("T", " ").split(".")[0]
}
