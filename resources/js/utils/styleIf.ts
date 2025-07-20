import { CSSProperties } from "react"

function styleIf(condition: boolean, styles: CSSProperties) {
  return condition ? styles : {}
}

export default styleIf
