import { chakra } from "@chakra-ui/react"
import Image from "next/image"
import React, { ReactNode } from "react"

const ChakraNextImage = (chakra(Image,{
    baseStyle: {
        maxH: 120,
        maxW: 120
    },
    shouldForwardProp: (props) =>
            [
                "width",
                "height",
                "src",
                "alt",
                "quality",
                "placeholder",
                "blurDataURL",
                "loader ",
                "padding",
                "margin",
              ].includes(props),
}))

export default ChakraNextImage