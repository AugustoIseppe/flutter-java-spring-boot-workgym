import 'dart:convert';

import 'package:http/http.dart' as http;

import 'package:workgym/app/utils/constants/constants.dart';
import 'package:workgym/app/utils/store.dart';
import 'package:workgym/app/models/user_model.dart';
import 'package:workgym/app/repositories/user_repository.dart';

class UserRepositoryImpl implements UserRepository {
  final Constants constants = Constants();
  String? token;

  @override
  Future<String> login(String login, String password) async {
    try {
      final response = await http.post(
        Uri.parse(constants.loginUrl),
        body: jsonEncode({"login": login, "password": password}),
        headers: {'Content-Type': 'application/json'},
      );
      if (response.statusCode == 200) {
        final Map<String, dynamic> jsonResponse = jsonDecode(response.body);
        token = jsonResponse['token'];

        //Salvando o token no SharedPreferences
        await Store.saveString("token", token!);
        print("TOKEN SALVO NO SHARED PREFERENCES!!! -> $token");

        return token!;
      } else {
        throw Exception('Failed to load data');
      }
    } catch (error) {
      // ignore: avoid_print
      print('Error LOGIN: $error');
      rethrow;
    }
  }

  @override
  Future<bool> tryAutoLogin() async {
    final savedToken = await Store.getString('token');

    if (savedToken.isEmpty) return false;
    print(
      "TOKEN SALVO NO SHARED PREFERENCES TRY AUTO LOGINN!!! -> $savedToken",
    );
    try {
      final response = await http.get(
        Uri.parse(constants.getMeUrl),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $savedToken',
        },
      );
      print('RESPOSTA DO GET ME: ${response.body}');
      print('STATUS CODE DO GET ME: ${response.statusCode}');

      if (response.statusCode == 200) {
        final Map<String, dynamic> userData = jsonDecode(response.body);
        // Usando o UserModel para salvar os dados
        UserModel user = UserModel.fromMap(userData);

        // Salve os dados do usuário no SharedPreferences ou em outro local
        await Store.saveString('user', jsonEncode(user.toMap()));
        print("Usuário autenticado automaticamente!");
        return true;
      } else {
        return false;
      }
    } catch (e) {
      print('Erro no tryAutoLogin: $e');
      return false;
    }
  }

  @override
  Future<Map<String, dynamic>> getMe(String token) {
    return http
        .get(
          Uri.parse(constants.getMeUrl),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer $token',
          },
        )
        .then((response) {
          if (response.statusCode == 200) {
            final Map<String, dynamic> jsonResponse = jsonDecode(response.body);
            // ignore: avoid_print
            print("RETORNO API GET ME (USUÁRIO) !!! -> ${jsonResponse}");
            return jsonResponse;
          } else {
            throw Exception('Failed to load data');
          }
        })
        // ignore: body_might_complete_normally_catch_error
        .catchError((error) {
          // ignore: avoid_print
          print('Error GETME: $error');
          // rethrow;
        });
  }
}
