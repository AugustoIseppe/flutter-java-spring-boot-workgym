// ignore_for_file: public_member_api_docs, sort_constructors_first
//String name, String email, String password, String cpf, String login, UserRole role
class UserModel {
  String name;
  String email;
  String cpf;
  String login;
  String role;
  UserModel({
    required this.name,
    required this.email,
    required this.cpf,
    required this.login,
    required this.role,
  });

  Map<String, dynamic> toMap() {
    return {
      'name': name,
      'email': email,
      'cpf': cpf,
      'login': login,
      'role': role, // Convert enum to string
    };
  }

  factory UserModel.fromMap(Map<String, dynamic> json) {
    return UserModel(
      name: json['name'],
      email: json['email'],
      cpf: json['cpf'],
      login: json['login'],
      role: json['role'],
    );
  }

  UserModel copyWith({
    String? name,
    String? email,
    String? cpf,
    String? login,
    String? role,
  }) {
    return UserModel(
      name: name ?? this.name,
      email: email ?? this.email,
      cpf: cpf ?? this.cpf,
      login: login ?? this.login,
      role: role ?? this.role,
    );
  }

  @override
  String toString() {
    return 'UserModel(name: $name, email: $email, cpf: $cpf, login: $login, role: $role)';
  }
}
