import java.awt.*;
import java.util.Random;

public class RedBall extends Ball{
    Random random = new Random();
    public RedBall(Color color, int xSpeed, int ySpeed, int ballSize, Subject<Ball> subject, Subject<Ball> whiteBallSubject) {
        super(color, xSpeed, ySpeed, ballSize);
        subject.registerObserver(this);
        whiteBallSubject.registerObserver(this);
    }

    @Override
    public void update(char keyChar) {
        switch (keyChar) {
            case 'a':
                this.setXSpeed(-random.nextInt(3) - 1);
                break;
            case 'd':
                this.setXSpeed(random.nextInt(3) + 1);
                break;
            case 'w':
                this.setYSpeed(-random.nextInt(3) - 1);
                break;
            case 's':
                this.setYSpeed(random.nextInt(3) + 1);
        }
    }

    @Override
    public void update(Ball ball) {
        if(ball.isIntersect(this)){
            this.setXSpeed(ball.getXSpeed());
            this.setYSpeed(ball.getYSpeed());
        }
    }
}
