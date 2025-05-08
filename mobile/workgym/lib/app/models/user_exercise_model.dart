
class UserExerciseModel {
  String name;
  String description;
  String image;
  int series;
  int repetitions;
  String observation;

  UserExerciseModel({
    required this.name,
    required this.description,
    required this.image,
    required this.series,
    required this.repetitions,
    required this.observation,
  });

  factory UserExerciseModel.fromJson(Map<String, dynamic> json) {
    return UserExerciseModel(
      name: json['name'],
      description: json['description'],
      image: json['image'],
      series: json['series'],
      repetitions: json['repetitions'],
      observation: json['observation'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'description': description,
      'image': image,
      'series': series,
      'repetitions': repetitions,
      'observation': observation,
    };
  }

  @override
  String toString() {
    return 'UserExerciseModel{name: $name, description: $description, image: $image, series: $series, repetitions: $repetitions, observation: $observation}';
  }
  
}