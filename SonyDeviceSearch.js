(function(global){
    
    "use strict";
    
    function constPrivatePropValueDesc(v, constant){
        return {
            value: v,
            enumerable: false,
            configurable: false,
            writable: !constant
        };
    }
    
    /**
     * A simple Sony Camera local search client based on SSDP
     * 
     * @see: http://www.w3.org/TR/discovery-api/
     * @constructor
     */
    function SonyDeviceSearch(){
        Object.defineProperty(this, 'SSDP_ST', constPrivatePropValueDesc('urn:schemas-sony-com:service:ScalarWebAPI:1'));
    }
    
    SonyDeviceSearch.prototype = {
        
        /**
         * Search API server device ( Network Service Discovery )
         * 
         * @param onDeviceFound Called when API server device is found
         * @param onFinished Called when searching completes successfully
         * @param onError Called when searching completes with some errors
         * @return true: start successfully, false: already searching now
         */
        searchDevices: function(onDeviceFound, onFinished, onError){
            
            /**
             * This will only work if following bugs have been landed:
             * 
             *   Firefox: https://bugzilla.mozilla.org/show_bug.cgi?id=914579
             *   Chrome:  https://code.google.com/p/chromium/issues/detail?id=267158
             * 
             */
            if(navigator.getNetworkServices){
                
                navigator.getNetworkServices(
                    this.SSDP_ST, 
                    function(services){
                        if(onDeviceFound && typeof onDeviceFound === 'function'){
                            onDeviceFound(services);
                        }
                    }, 
                    function(e){
                        if(onError && typeof onError === 'function'){
                            onError(e);
                        }
                    }
                );
                
            } else {
                onError('Network Service Discovery API is not supported in this Browser');
                return false;
            }
            
            // start successfully
            return true;
        }
    };
    
    // export
    global.SonyDeviceSearch = SonyDeviceSearch;
    
})(this);
