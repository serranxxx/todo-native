import logo from '../assets/SVG/logo.png'
import light from '../assets/SVG/light-logo.png'
import text from '../assets/SVG/text.png'
import text_light from '../assets/SVG/text-light.png'

import a1 from '../assets/avatars/avatar-1.png'
import a2 from '../assets/avatars/avatar-2.png'
import a3 from '../assets/avatars/avatar-3.png'
import a4 from '../assets/avatars/avatar-4.png'

export const images = {
    logo,
    light,
    text,
    text_light
}

export const avatars = [
    {
        image: a1,
        value: 1
    },
    {
        image: a2,
        value: 2
    },
    {
        image: a3,
        value: 3
    },
    {
        image: a4,
        value: 4
    }
]


export function selectAvatar(index) {
    switch (index) {
        case 1: return a1
        case 2: return a2
        case 3: return a3
        case 4: return a4
        default:
            break;
    }
}

