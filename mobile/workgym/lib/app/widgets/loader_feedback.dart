import 'package:flutter/material.dart';

enum LoaderState { loading, success, error }

class LoaderFeedback extends StatefulWidget {
  final LoaderState state;
  final String message;
  final bool autoDismiss;
  final Duration duration;

  const LoaderFeedback({
    super.key,
    required this.state,
    required this.message,
    this.autoDismiss = false,
    this.duration = const Duration(seconds: 2),
  });

  @override
  State<LoaderFeedback> createState() => _LoaderFeedbackState();
}

class _LoaderFeedbackState extends State<LoaderFeedback> {
  bool _visible = true;

  @override
  void initState() {
    super.initState();
    if (widget.autoDismiss) {
      Future.delayed(widget.duration, () {
        if (mounted) {
          setState(() => _visible = false);
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (!_visible) return const SizedBox.shrink();

    IconData icon;
    switch (widget.state) {
      case LoaderState.success:
        icon = Icons.check_circle_outline;
        break;
      case LoaderState.error:
        icon = Icons.error_outline;
        break;
      default:
        icon = Icons.hourglass_top;
    }

    return AnimatedOpacity(
      opacity: _visible ? 1.0 : 0.0,
      duration: const Duration(milliseconds: 300),
      child: Container(
        color: Colors.black.withValues(alpha: .5),
        alignment: Alignment.center,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 60, color: const Color(0xFFFFF9E6)),
            const SizedBox(height: 20),
            Text(
              widget.message,
              style: const TextStyle(
                color: Color(0xFFFFF9E6),
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
