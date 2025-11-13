function drawShape(ctx, shape, size, rotation) {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;



    // save the current transformation matrix.
    ctx.save();
    
    // shift (move) the canvas drawing matrix so that we will begin drawing at the center 
    // point of the canvas using the constants above.
    ctx.translate(centerX,centerY);
    
    // rotate the canvas drawing matrix so that it uses the rotation value passed in.
    ctx.rotate(rotation);

    // begin a new path.
    ctx.beginPath();
    

    switch (shape) {
        case 'line':
            // TODO: draw a horizontal line centered at the origin (0, 0)
            // The line should extend size/2 in both the negative and positive x direction
            // This will make it rotate like a propeller around its center
            ctx.moveTo(0-size/2,0);
            ctx.lineTo(size/2,0);


            break;
        case 'square':
            // HINT: use ctx.rect(x, y, width, height) to draw a square
            // Remember: rect() draws from the top-left corner
            // To center it at origin, the top-left corner should be at negative half-size
            ctx.rect(0 - size / 2, 0- size / 2, size, size)


            break;
        case 'triangle':
            // Triangle is already implemented as an example
            ctx.moveTo(0, -size / 2);
            ctx.lineTo(size / 2, size / 2);
            ctx.lineTo(-size / 2, size / 2);
            break;
    }
    // close the path.
    ctx.closePath();


    ctx.stroke();
    // restore the previous transformation matrix.
    ctx.restore();


}
export{drawShape};
