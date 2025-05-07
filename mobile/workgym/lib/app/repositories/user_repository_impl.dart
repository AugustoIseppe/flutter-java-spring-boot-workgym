import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'package:workgym/app/constants/constants.dart';
import 'package:workgym/app/data/store.dart';
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
  Future<Map<String, dynamic>?> tryAutoLogin(String token) async {
    final userData = await Store.getMap("userData");
    debugPrint("RETORNO API SHARED PREFERENCESSSS!!! -> $userData");
    return userData;
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
        .catchError((error) {
          // ignore: avoid_print
          print('Error GETME: $error');
          // rethrow;
        });
  }
}
