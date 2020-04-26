// Had to change the component "stepControls" to disallow going up+right at the same time
// also making methods to go into directions avaible
// component smartControls
export const SmartControls = Q => Q.component("smartControls", {

    added: function () {

        var p = this.entity.p;

        if (!p.stepDistance) {
            p.stepDistance = 32;
        }
        if (!p.stepDelay) {
            p.stepDelay = 0.2;
        }
        if (!p.direction) {
            p.direction = "down";
        }

        p.stepWait = 0;

        p.origX = p.x;
        p.origY = p.y;

        p.justStartedStepping = false;

        this.entity.on("step", this, "step");
        this.entity.on("hit", this, "collision");

    },

    collision: function (col) {

        var p = this.entity.p;

        if (p.stepping) {

            p.stepping = false;

        }

        p.x = p.origX;
        p.y = p.origY;

    },

    step: function (dt) {

        var p = this.entity.p;

        p.justStartedStepping = false;
        p.stepWait -= dt;

        if (p.stepping) { // Move the player

            p.x += p.diffX * dt / p.stepDelay;
            p.y += p.diffY * dt / p.stepDelay;

        } else if (p.freeze) { // If player is not currently stepping and is set on freeze, stop him

            this.entity.play("stand_" + p.direction);
            return;

        }

        if (p.stepWait > 0) {
            return;
        }

        if (p.stepping) {

            p.x = p.destX;
            p.y = p.destY;

            p.stepping = false;

        }

        p.origX = p.x;
        p.origY = p.y;

        p.diffX = 0;
        p.diffY = 0;

        var go_array_empty = (p.go_array.length === 0);

        if ((go_array_empty && p.userControlledStepping && Q.inputs.up) || p.go_array[0] === 'up') {

            p.diffY = -p.stepDistance;
            p.direction = "up";
            if (!go_array_empty) p.go_array.splice(0, 1);

        } else if ((go_array_empty && p.userControlledStepping && Q.inputs.down) || p.go_array[0] === 'down') {

            p.diffY = p.stepDistance;
            p.direction = "down";
            if (!go_array_empty) p.go_array.splice(0, 1);

        } else if ((go_array_empty && p.userControlledStepping && Q.inputs.left) || p.go_array[0] === 'left') {

            p.diffX = -p.stepDistance;
            p.direction = "left";
            if (!go_array_empty) p.go_array.splice(0, 1);

        } else if ((go_array_empty && p.userControlledStepping && Q.inputs.right) || p.go_array[0] === 'right') {

            p.diffX = p.stepDistance;
            p.direction = "right";
            if (!go_array_empty) p.go_array.splice(0, 1);

        }

        if (p.diffY || p.diffX) {

            p.stepping = true;
            p.destX = p.x + p.diffX;
            p.destY = p.y + p.diffY;
            p.stepWait = p.stepDelay;

            p.justStartedStepping = true;

            // If person is walking play proper animation
            this.entity.play("walk_" + p.direction);

        } else { // Person is currently standing

            this.entity.play("stand_" + p.direction);

        }

    }

});


