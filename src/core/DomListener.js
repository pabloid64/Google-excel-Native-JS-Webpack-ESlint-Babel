import { capitalize } from '@core/util'

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            return new Error 
        } else {
            this.$root = $root;
        }
        this.listeners = listeners;
    }
    initDomListener() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);
            if (!this[method]) {
                throw new Error(`Methods ${method} is not implemented fot ${this.name} Component`)
            }
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }

    removeDomListener() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);
            this.$root.off(listener, this[method])
        })
    }
}

function getMethodName(string) {
    return "on" + capitalize(string);
} 