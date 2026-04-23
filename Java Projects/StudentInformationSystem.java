import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

class Student {
    private Integer id;
    private String name;
    private Integer age;
    private String grade;
    private String favoriteSubjects;

    public Student(Integer id, String name, Integer age, String grade, String favoriteSubjects) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.grade = grade;
        this.favoriteSubjects = favoriteSubjects;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getFavoriteSubjects() {
        return favoriteSubjects;
    }

    public void setFavoriteSubjects(String favoriteSubjects) {
        this.favoriteSubjects = favoriteSubjects;
    }
}

public class StudentInformationSystem {
    static Scanner sc;
    static int id = 1;

    public static Student readStudent() {
        Integer studentId = id++;

        System.out.println("Enter name: ");
        System.out.print("> ");
        String name = sc.nextLine();
        System.out.println("Enter age: ");
        System.out.print("> ");
        Integer age = Integer.parseInt(sc.nextLine());
        System.out.println("Enter grade: ");
        System.out.print("> ");
        String grade = sc.nextLine();
        System.out.println("Enter favorite subjects: ");
        System.out.print("> ");
        String favoriteSubjects = sc.nextLine();

        Student student = new Student(studentId, name, age, grade, favoriteSubjects);
        return student;
    }

    public static void main(String[] args) {
        sc = new Scanner(System.in);

        List<Student> students = new ArrayList<>();
        String option = "init";

        while(true) {
            System.out.println("1. Add student");
            System.out.println("2. List all students");
            System.out.println("[enter 'exit' to quit.]");
            System.out.print("> ");

            option = sc.nextLine();

            if(option.equals("1")) {
                Student student = readStudent();

                students.add(student);

                System.out.println("Added student successfully.");
            } else if(option.equals("2")) {
                for(Student student : students) {
                    System.out.println(
                            "Name: " + student.getName() + "\n" +
                            "Age: " + student.getAge() + "\n" +
                            "Grade: " + student.getGrade() + "\n" +
                            "Favorite Subjects: " + student.getFavoriteSubjects() + "\n"
                    );
                }

                System.out.println("--------------------------\n");
            } else {
                sc.close();
                break;
            }
        }
    }
}