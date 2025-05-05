package ais.io.workgym.repositories;

import ais.io.workgym.entities.UserExercise;
import ais.io.workgym.entities.WeekDay;
import ais.io.workgym.projections.UserExerciseProjectionDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface UserExerciseRepository extends JpaRepository<UserExercise, UUID> {
//    @Query("SELECT new ais.io.workgym.dto.userExercise.UserExerciseProjectionDTO(e.name, e.description, ue.series, ue.repetitions, ue.observation) " +
//            "FROM UserExercise ue " +
//            "JOIN ue.exercise e " +
//            "WHERE ue.user.id = :userId AND ue.weekDay = :weekDay")
//    List<UserExerciseProjectionDTO> findUserExercisesByUserIdAndWeekDay(@Param("userId") UUID userId, @Param("weekDay") WeekDay weekDay);
//
    @Query(value = "SELECT e.name, e.description, e.image, ue.series, ue.repetitions, ue.observation " +
            "FROM tb_user_exercise ue " +
            "JOIN tb_exercise e ON ue.exercise_id = e.id " +
            "WHERE ue.user_id = :userId AND ue.week_day = :weekDay", nativeQuery = true)
    List<Object[]> findRawUserExercisesByUserIdAndWeekDay(@Param("userId") UUID userId, @Param("weekDay") String weekDay);

//    @Query(value = "SELECT e.name, e.description, e.image_url, ue.series, ue.repetitions, ue.observation " +
//            "FROM tb_user_exercise ue " +
//            "JOIN tb_exercise e ON ue.exercise_id = e.id " +
//            "WHERE ue.user_id = :userId AND ue.week_day = :weekDay", nativeQuery = true)
//    List<Object[]> findRawUserExercisesByUserIdAndWeekDay(@Param("userId") UUID userId, @Param("weekDay") String weekDay);


}
