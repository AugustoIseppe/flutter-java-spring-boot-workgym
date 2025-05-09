import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class PlansPage extends StatelessWidget {
  const PlansPage({super.key});

  @override
  Widget build(BuildContext context) {
    final plans = [
      {'name': 'Plano Mensal', 'details': 'Acesso livre por 30 dias'},
      {'name': 'Plano Trimestral', 'details': '3 meses com desconto de 10%'},
      {
        'name': 'Plano Semestral',
        'details': '6 meses + 1 avaliação física grátis',
      },
      {'name': 'Plano Anual', 'details': '12 meses + brinde exclusivo'},
      {
        'name': 'Zumba Premium',
        'details': 'Acesso ilimitado às aulas de Zumba',
      },
      {'name': 'Jump Total', 'details': 'Aulas de Jump todos os dias'},
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
          'Nossos Planos',
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
                  itemCount: plans.length,
                  itemBuilder: (context, index) {
                    final plan = plans[index];
                    return Card(
                      color: Colors.white10,
                      margin: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 8,
                      ),
                      child: ListTile(
                        title: Text(
                          plan['name']!,
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        subtitle: Text(
                          plan['details']!,
                          style: const TextStyle(color: Colors.white70),
                        ),
                        leading: const Icon(
                          Icons.fitness_center,
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
