
    // Update fill color of target svg element
    function updateFillColor(targetElementClassName, color) {
      if(targetElementClassName && color) {
        var elements = document.getElementsByClassName(targetElementClassName);
        if(elements) {
          for (let element of elements) {
            element.setAttribute('fill', color);
          }
        }
      }
    }

    // Change colors on click on each color block
    function changeColors(colorClassName) {
      var colorElements = document.getElementsByClassName(colorClassName);
      if(colorElements) {
        for (let colorElement of colorElements) {
          colorElement.addEventListener('click', function() {
            var targetElementClass = colorElement.getAttribute('data-svg-path-class');
            var color = colorElement.getAttribute('data-color');
            updateFillColor(targetElementClass, color);
          });
        }
      }
    }

    // Change colors on click on each color block
    document.addEventListener('DOMContentLoaded', function() {
      changeColors('color-block');
    });
    