export const hexToDecimal = (hex: string): BigInt => {
    const hexDigits = "0123456789ABCDEF";
    let decimal = BigInt(hexDigits.indexOf(hex[hex.length - 1].toUpperCase()));

    for (let i: number = 2; i <= hex.length; i++) { 
        const digit = BigInt(hexDigits.indexOf(hex[hex.length - i].toUpperCase()));
        decimal = decimal + digit * BigInt(16) ** BigInt(i - 1);
    }

    return decimal;
}