import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useMediaQuery } from '@/hooks/use-media-query';

type BlindspotData = {
  category: string;
  blindspot: string;
  summary: string;
};

export function BlindspotTable() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Sample data based on the screenshot
  const blindspotData: BlindspotData[] = [
    {
      category: 'Motive',
      blindspot: 'Affiliation',
      summary:
        'Your drive to connect can be so strong that it inadvertently sidelines other priorities.',
    },
    {
      category: 'Traits',
      blindspot: 'Agreeableness',
      summary:
        "You are likely agreeable and easily trust others compared to those who are comfortable with disagreement and in environments where they may have to play politics or manipulate others. You may be so trusting that you miss potential ill intentions or neglect to critically evaluate someone's actions or performance.",
    },
    {
      category: 'Emotion',
      blindspot: 'No Specific Blindspot Found',
      summary:
        'You likely show a solid balance in managing both your own emotions and understanding the emotions of others. How can you build on this balance to maintain your strengths and leverage them for greater success in your role?',
    },
    {
      category: 'Intellect',
      blindspot: 'Creativity',
      summary:
        "Others likely respect your ability to think differently and to problem solve. However, your quick mental speed and agility may leave others behind if you aren't careful to include them in the process. It may be hard for you when others aren't interested in your ideas, or struggle to understand the connections you make to unconventional or seemingly unrelated ideas and concepts. You may also struggle to balance your creativity within the guidelines, deadlines, and demands of your work environment.",
    },
    {
      category: 'Behavior',
      blindspot: 'Communication: Low Criticality and High Support',
      summary:
        'Low Criticality: You are often tolerant and accepting of others. You focus on what is "right and good" rather than focusing on what is "wrong and bad." You may be more tolerant of the weaknesses in others. You may be an analytical thinker, but you are less likely to find fault or expect the worst from things, people, and ideas.\n\nHigh Support: Your communication is likely very supportive and kind in tone. You are attentive to what others share with you. You are trusting in nature, and so, might take others at face value. You might not ask critical questions to dig deeper and understand the full picture. You may struggle with holding others accountable and engaging in more difficult conversations.',
    },
  ];

  // For mobile, render cards instead of a table
  if (isMobile) {
    return (
      <div className="w-full space-y-4">
        {blindspotData.map((item, index) => (
          <div
            key={index}
            className={`rounded-lg border p-4 ${index % 2 === 0 ? 'bg-muted/50' : ''}`}
          >
            <div className="mb-2 flex items-center justify-between">
              <h4 className="text-sm font-medium">{item.category}</h4>
              <span className="text-sm">{item.blindspot}</span>
            </div>
            <p className="whitespace-pre-line text-sm text-muted-foreground">{item.summary}</p>
          </div>
        ))}
      </div>
    );
  }

  // For desktop, render the regular table
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-32">Category</TableHead>
            <TableHead className="w-48">Your Blindspot</TableHead>
            <TableHead>Summary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blindspotData.map((item, index) => (
            <TableRow key={index} className={index % 2 === 0 ? 'bg-muted/50' : ''}>
              <TableCell className="font-medium">{item.category}</TableCell>
              <TableCell>{item.blindspot}</TableCell>
              <TableCell className="whitespace-pre-line">{item.summary}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
