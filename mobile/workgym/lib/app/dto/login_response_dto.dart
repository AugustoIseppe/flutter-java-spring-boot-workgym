class LoginResponseDto {
  final String? accessToken;

  LoginResponseDto({this.accessToken});

  factory LoginResponseDto.fromJson(Map<String, dynamic> json) {
    return LoginResponseDto(accessToken: json['accessToken']);
  }

  Map<String, dynamic> toJson() {
    return {'accessToken': accessToken};
  }

  @override
  String toString() {
    return 'LoginResponseDto{accessToken: $accessToken}';
  }
}
