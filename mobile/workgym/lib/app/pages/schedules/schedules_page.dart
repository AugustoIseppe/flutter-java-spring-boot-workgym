import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class SchedulesPage extends StatelessWidget {
  const SchedulesPage({super.key});

  @override
  Widget build(BuildContext context) {
    final schedules = [
      {'activity': 'Musculação', 'time': 'Seg a Sex - 06:00 às 22:00'},
      {'activity': 'Zumba', 'time': 'Seg, Qua e Sex - 19:00 às 20:00'},
      {'activity': 'Jump', 'time': 'Ter e Qui - 18:00 às 19:00'},
      {'activity': 'Funcional', 'time': 'Seg a Sex - 07:00 às 08:00'},
      {'activity': 'Yoga', 'time': 'Sáb - 09:00 às 10:00'},
      {'activity': 'Spinning', 'time': 'Seg a Qui - 20:00 às 21:00'},
    ];

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color(0xFF0f2d57),
        elevation: 10,
        shadowColor: Colors.black,
        titleSpacing: 2,
        foregroundColor: Colors.white,
        centerTitle: true,
        title: Text(
          'Horários das Aulas',
          style: GoogleFonts.merriweather(
            textStyle: TextStyle(
              color: Colors.white,
              letterSpacing: .5,
              fontSize: 25,
              fontWeight: FontWeight.bold,
            ),
          ),
          textAlign: TextAlign.center,
        ),
      ),
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/images/bg-home-page.png'),
            fit: BoxFit.cover,
          ),
          color: Color(0xFF0D47A1), // Azul escuro
        ),
        child: SafeArea(
          child: Column(
            children: [
              const SizedBox(height: 20),
              Expanded(
                child: ListView.builder(
                  itemCount: schedules.length,
                  itemBuilder: (context, index) {
                    final item = schedules[index];
                    return Card(
                      color: Colors.white10,
                      margin: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 8,
                      ),
                      child: ListTile(
                        title: Text(
                          item['activity']!,
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        subtitle: Text(
                          item['time']!,
                          style: const TextStyle(color: Colors.white70),
                        ),
                        leading: const Icon(
                          Icons.access_time,
                          color: Colors.white,
                        ),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
