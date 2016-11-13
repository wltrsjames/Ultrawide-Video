//page loads
$(document).ready(function() {
    function ultraWide {
        this.getScale = function() {
            //get users screen dimensions
            var width = screen.width;
            var height = screen.height;
            
            //get aspet ratio
            var aspect = width/height;
            

            var scale = width / 1920;
            //if width < 1920 do nothing
            
            if(scale < 1920) {
                scale = 1;
            }
            
            return scale;
        }
    }



});
