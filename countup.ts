// Add your code here
namespace info {
    let countupRunning = false;
    let elapsedTime = 0;
    let previousStamp: number;

    let fontColor = 3;
    let borderColor = fontColor;
    let bgColor = 1;

    let hudElement: scene.Renderable;
    
    //% blockId=gamestartcountup block="start countup || with ui $uiOn=toggleOnOff" weight=5
    //% group="Countup"
    export function startCountup(uiOn: boolean = true) {
        if (!countupRunning) {
            countupRunning = true;
            previousStamp = game.currentScene().millis();
        };

        if (!hudElement) {
            elapsedTime = 0;
            hudElement = scene.createRenderable(
                scene.HUD_Z,
                () => {
                    if (countupRunning) {
                        const stamp = game.currentScene().millis();
                        elapsedTime += stamp - previousStamp;
                        previousStamp = stamp;
                    }
                    if (uiOn) drawTimer(elapsedTime);
                }
            );
        }
    }
    
    //% blockId=gamepausecountup block="pause countup" weight=5
    //% group="Countup"
    export function pauseCountup() {
        countupRunning = false;
    }

    //% blockId=gameclearcountup block="clear countup" weight=5
    //% group="Countup"
    export function clearCountup() {
        countupRunning = false;
        if (hudElement) {
            hudElement.destroy(); 
            hudElement = undefined;
        }
    }

    //% blockId=gamegettimeelapsed block="seconds elapsed" weight=5
    //% group="Countup"
    export function getTimeElapsed() {
        return elapsedTime / 1000;
    }

    function drawTimer(millis: number) {
        if (millis < 0) millis = 0;
        millis |= 0;

        const font = image.font8;
        const smallFont = image.font5;
        const seconds = Math.idiv(millis, 1000);
        const width = font.charWidth * 5 - 2;
        let left = (screen.width >> 1) - (width >> 1) + 1;
        let color1 = fontColor;
        let color2 = bgColor;

        if (seconds < 10 && (seconds & 1) && !screen.isMono) {
            const temp = color1;
            color1 = color2;
            color2 = temp;
        }

        screen.fillRect(left - 3, 0, width + 6, font.charHeight + 3, borderColor)
        screen.fillRect(left - 2, 0, width + 4, font.charHeight + 2, color2)


        if (seconds < 60) {
            const top = 1;
            const remainder = Math.idiv(millis % 1000, 10);

            screen.print(formatDecimal(seconds) + ".", left, top, color1, font)
            const decimalLeft = left + 3 * font.charWidth;
            screen.print(formatDecimal(remainder), decimalLeft, top + 2, color1, smallFont)
        }
        else {
            const minutes = Math.idiv(seconds, 60);
            const remainder = seconds % 60;
            screen.print(formatDecimal(minutes) + ":" + formatDecimal(remainder), left, 1, color1, font);
        }
    }

    function formatDecimal(val: number) {
        val |= 0;
        if (val < 10) {
            return "0" + val;
        }
        return val.toString();
    }
}