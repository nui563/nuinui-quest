class GameEvent {
    frameCount = 0;
    timelineFrame = 0;
    index = 0;

    next = false;
    end = false;

    constructor(timeline) {
        this.timeline = timeline;
    }

    update = game => {
        this.timeline[this.index](game, this);
        if (this.next) {
            this.timelineFrame = 0;
            this.next = false;
            this.index++;
        } else {
            this.timelineFrame++;
        }
        this.frameCount++;
    }
}