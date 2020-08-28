export default interface IRequestDTO {
  latitude: number;
  longitude: number;
  whistleblower: {
    name: string;
    cpf: string;
  };
  report: {
    title: string;
    description: string;
  };
}
