import * as S from '../../styles/home/routine.style';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import BudgetList from '../../components/home/routine/budgetList';
import Modal from '../../components/home/routine/modal';
import { mockFullRoutineDetailData } from '../../mocks/home/mockRoutineData';

function RoutineDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const routine = mockFullRoutineDetailData.find(
    (item) => item.id === Number(id),
  );

  if (!routine) return null;

  const [showModal, setShowModal] = useState(false);
  const [reflected, setReflected] = useState(routine?.isReflected || false);

  return (
    <div className={`pageContainer ${S.Container}`}>
      <Header title={routine?.title || '소비 루틴 상세'} />
      <BudgetList
        totalBudget={routine.totalBudget}
        budgetList={routine.budgetList}
      />

      <button
        className={S.BudgetButton(routine.isReflected, routine.isReflected)}
        disabled={routine.isReflected}
        onClick={() => {
          if (!reflected) setShowModal(true);
        }}
      >
        내 예산에 반영
      </button>

      {routine.isReflected && (
        <div className={S.ErrorMessage}>
          소비 루틴은 한 달에 한 번만 반영할 수 있어요.
        </div>
      )}

      {showModal && (
        <Modal
          text="내 예산에 반영할까요?"
          onConfirm={() => {
            setReflected(true);
            setShowModal(false);
            alert('루틴 가져오기 성공');
            navigate('/budget-register');
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default RoutineDetail;
