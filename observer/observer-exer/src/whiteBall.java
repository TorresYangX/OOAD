import java.awt.*;
import java.util.ArrayList;
import java.util.List;

public class whiteBall extends Ball implements Subject<Ball>{
    MainPanel subject;
    public whiteBall(Color color, int xSpeed, int ySpeed, int ballSize, Subject<Ball> subject) {
        super(color, xSpeed, ySpeed, ballSize);
        subject.registerObserver(this);
        this.subject = (MainPanel) subject;
    }

    private  List<Ball> observers = new ArrayList<>();
    @Override
    public void update(char keyChar) {
        if (subject.getGameStatus() == MainPanel.GameStatus.START) {
            switch (keyChar) {
                case 'a':
                    this.setXSpeed(-8);
                    break;
                case 'd':
                    this.setXSpeed(8);
                    break;
                case 'w':
                    this.setYSpeed(-8);
                    break;
                case 's':
                    this.setYSpeed(8);
                    break;
            }
        }
    }

    @Override
    public void update(Ball ball) {

    }

    @Override
    public void registerObserver(Ball ball) {
        observers.add(ball);
    }

    @Override
    public void removeObserver(Ball ball) {
        observers.remove(ball);
    }

    @Override
    public void notifyObservers(char keyChar) {

    }
    @Override
    public void notifyObservers() {
        for (Ball b: observers){
            b.update(this);
        }
    }
}
