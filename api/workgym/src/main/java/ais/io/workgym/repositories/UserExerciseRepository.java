package ais.io.workgym.repositories;

import ais.io.workgym.entities.UserExercise;
import ais.io.workgym.projections.UserExerciseProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface UserExerciseRepository extends JpaRepository<UserExercise, UUID> {
    @Query(value = "SELECT e.name, e.description, e.image, ue.series, ue.repetitions, ue.observation " +
            "FROM tb_user_exercise ue " +
            "JOIN tb_exercise e ON ue.exercise_id = e.id " +
            "WHERE ue.users_id = :userId AND ue.week_day = :weekDay", nativeQuery = true)
    List<Object[]> findRawUserExercisesByUserIdAndWeekDay(@Param("userId") UUID userId, @Param("weekDay") String weekDay);

    @Query(value = """
            SELECT week_day
            FROM (
                SELECT DISTINCT week_day
                FROM tb_user_exercise
                WHERE users_id = :userId
            ) AS dias
            ORDER BY
                CASE week_day
                    WHEN 'SEGUNDA' THEN 1
                    WHEN 'TERCA' THEN 2
                    WHEN 'QUARTA' THEN 3
                    WHEN 'QUINTA' THEN 4
                    WHEN 'SEXTA' THEN 5
                    WHEN 'SABADO' THEN 6
                    WHEN 'DOMINGO' THEN 7
                END
            """, nativeQuery = true)
    List<String> findDistinctWeekDaysByUserIdOrdered(@Param("userId") UUID userId);

    @Query(value = """
                SELECT 
                    e.name AS name,
                    e.description AS description,
                    e.muscle_group AS muscleGroup,
                    e.image AS image,
                    e.equipment AS equipment,
                    ue.series AS series,
                    ue.week_day AS weekDay,
                    ue.repetitions AS repetitions,
                    ue.observation AS observation
                FROM tb_user_exercise ue
                JOIN tb_exercise e ON ue.exercise_id = e.id
                WHERE ue.users_id = :userId
            """, nativeQuery = true)
    List<UserExerciseProjection> findUserExercisesByUserId(@Param("userId") UUID userId);

}
