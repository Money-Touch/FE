import * as S from '../../styles/home/routine.style';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import BudgetList from '../../components/home/routine/budgetList';
import Modal from '../../components/home/routine/modal';
import { useRoutineDetail } from '../../hooks/home/routine/useRoutineDetail';

function RoutineDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const routineId = Number(id);
  const { data, isLoading, isError } = useRoutineDetail(routineId);

  const [showModal, setShowModal] = useState(false);

  if (isLoading) return null;
  if (isError || !data?.result) return null;

  const routine = data.result;

  return (
    <div
      className={`pageContainer ${S.Container} !pt-[11rem] !overflow-y-auto !overflow-x-hidden`}
    >
      <Header title={routine?.routineName} />
      <BudgetList
        totalBudget={routine.totalBudget}
        budgetList={routine.categoryBudgetList}
      />

      <button
        className={S.BudgetButton(!routine.canApply)}
        disabled={!routine.canApply}
        onClick={() => {
          if (routine.canApply) setShowModal(true);
        }}
      >
        내 예산에 반영
      </button>

      {!routine.canApply && (
        <div className={S.ErrorMessage}>{routine.cannotApplyMessage}</div>
      )}

      <div className="!mb-[7.4rem]" />

      {showModal && (
        <Modal
          text="내 예산에 반영할까요?"
          onConfirm={() => {
            setShowModal(false);
            navigate('/budget-register');
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default RoutineDetail;
