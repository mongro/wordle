import React from "react";

const calcPercentages = (values, total) => {
  return values.map((value) => Math.floor((value / total) * 100));
};

function DistributionGraph({ distribution, labels, total }) {
  const percentages = calcPercentages(distribution, total);

  return (
    <div className="w-9/12">
      {percentages.map((value, index) => (
        <div className="flex flex-row items-center h-5 text-base mb-2 w-full">
          <div className="">{labels[index]}</div>
          <div className="h-full w-full bg-zinc-400 ml-2">
            <div
              className="animate-grow bg-lime-600 origin-left h-full"
              style={{ width: `${value}%` }}
            ></div>
          </div>
          <div className="ml-2">{distribution[index]}</div>
        </div>
      ))}
    </div>
  );
}

function Stats({ statistics }) {
  return (
    <div className="flex flex-row">
      <div className="p-2 text-center">
        <div className="text-3xl text-bold">{statistics.gamesPlayed}</div>
        <div className="text-base"> Games Played</div>
      </div>
      <div className="p-2 text-center">
        <div className="text-3xl text-bold">
          {`${Math.round(
            (statistics.gamesWon / statistics.gamesPlayed) * 100
          )}%`}
        </div>
        <div className="text-base"> Winrate</div>
      </div>
      <div className="p-2 text-center">
        <div className="text-3xl text-bold">{statistics.currentStreak}</div>
        <div className="text-base"> current Streak</div>
      </div>
      <div className="p-2 text-center">
        <div className="text-3xl text-bold">{statistics.maxStreak}</div>
        <div className="text-base"> max Streak</div>
      </div>
    </div>
  );
}

function Statistics({ statistics }) {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl text-center font-bold mb-2">Statistics</h1>
      <Stats statistics={statistics} />
      <h1 className="text-2xl text-center font-bold mb-2">Distribution</h1>
      <DistributionGraph
        distribution={statistics.guesses}
        total={statistics.gamesPlayed}
        labels={[1, 2, 3, 4, 5, 6]}
      />
    </div>
  );
}

export default Statistics;
