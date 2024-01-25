export function darker(hex, factor) {
    // Validar el formato del código hexadecimal
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) {
        console.error("Formato hexadecimal no válido");
        return null;
    }

    // Extraer los componentes de color
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    // Aplicar el factor para oscurecer el color
    r = Math.max(0, Math.floor(r * factor));
    g = Math.max(0, Math.floor(g * factor));
    b = Math.max(0, Math.floor(b * factor));

    // Convertir los componentes de nuevo a hexadecimal y devolver el nuevo código
    return `#${(r < 16 ? '0' : '') + r.toString(16)}${(g < 16 ? '0' : '') + g.toString(16)}${(b < 16 ? '0' : '') + b.toString(16)}`;
}

export function lighter(hex, factor) {
    // Validar el formato del código hexadecimal
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) {
        console.error("Formato hexadecimal no válido");
        return null;
    }

    // Extraer los componentes de color
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    // Aplicar el factor para aclarar el color
    r = Math.min(255, Math.floor(r + (255 - r) * factor));
    g = Math.min(255, Math.floor(g + (255 - g) * factor));
    b = Math.min(255, Math.floor(b + (255 - b) * factor));

    // Convertir los componentes de nuevo a hexadecimal y devolver el nuevo código
    return `#${(r < 16 ? '0' : '') + r.toString(16)}${(g < 16 ? '0' : '') + g.toString(16)}${(b < 16 ? '0' : '') + b.toString(16)}`;
}

export const TaskCounter = (myTasks) => {
    if (myTasks) {
        const finishedTasks = myTasks.filter(task => task.finished)
        if (finishedTasks) {
            return finishedTasks.length
        } else return 0
    }

}