
import 'package:workgym/app/models/user_exercise_model.dart';

abstract class UserRepository {
  Future<String> login(String login, String password);
  Future<bool> tryAutoLogin();
  Future<Map<String, dynamic>> getMe(String token);
  Future<List<String>> getWeekDay(String userId);
  Future<List<UserExerciseModel>> getExercises(String userId, String weekDay);
}