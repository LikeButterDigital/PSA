// Function to change the color of the court area
    function changeBorderColor(color) {
      // Select the part of the SVG you want to change
      console.log("calling border color change", color);
      const left = document.getElementById('left-border');
      const right = document.getElementById('right-border');
      const bottom = document.getElementById('bottom-border');
      const top = document.getElementById('top-border');
      left.setAttribute('fill', color);
      right.setAttribute('fill', color);
      top.setAttribute('fill', color);
      bottom.setAttribute('fill', color);
    }

    function changeCourtColor(color) {
      // Select the part of the SVG you want to change
      console.log("calling court color change", color);
      const court1 = document.getElementById('court1');
      const court2 = document.getElementById('court2');
      const court3 = document.getElementById('court3');
      const court4 = document.getElementById('court4');
      court1.setAttribute('fill', color);  // Change the fill color
      court2.setAttribute('fill', color);  // Change the fill color
      court3.setAttribute('fill', color);  // Change the fill color
      court4.setAttribute('fill', color);  // Change the fill color
    }
    function changeColor(color) {
      // Select the part of the SVG you want to change
      console.log("calling court color change", color);
      const nonPlaying1 = document.getElementById('nonPlaying1');
      nonPlaying1.setAttribute('fill', color);  // Change the fill color
      const nonPlaying2 = document.getElementById('nonPlaying2');
      nonPlaying2.setAttribute('fill', color);  // Change the fill color
      const nonPlaying3 = document.getElementById('nonPlaying3');
      nonPlaying3.setAttribute('fill', color);  // Change the fill color
    }
    document.getElementById('border-moss').onclick = function(){
        changeBorderColor('#52653E')
    }
